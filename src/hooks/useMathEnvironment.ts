// src/hooks/useMathEnvironment.ts
import { useState, useCallback } from 'react';
import * as math from 'mathjs';
import { Monaco as monaco } from '@monaco-editor/react';

interface Suggestion {
  label: string;
  kind: monaco.languages.CompletionItemKind;
  insertText: string;
  detail?: string;
}

export const useMathEnvironment = () => {
  const [variables, setVariables] = useState<Record<string, number>>({});

  const updateVariables = useCallback((newVars: Record<string, number>) => {
    setVariables(prev => ({ ...prev, ...newVars }));
  }, []);

  const getSuggestions = useCallback((): Suggestion[] => {
    const mathFunctions = Object.keys(math).filter(key => typeof math[key as keyof typeof math] === 'function');
    const variableSuggestions = Object.keys(variables).map(v => ({
      label: v,
      kind: monaco.languages.CompletionItemKind.Variable,
      insertText: v,
      detail: `${v} = ${variables[v]}`
    }));

    const functionSuggestions = mathFunctions.map(f => ({
      label: f,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `${f}($0)`,
      detail: `Math function: ${f}`
    }));

    return [...variableSuggestions, ...functionSuggestions];
  }, [variables]);

  return { variables, updateVariables, getSuggestions };
};