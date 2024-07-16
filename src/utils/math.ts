import { evaluate, ParseError } from 'mathjs';

interface EvaluationResult {
  original: string;
  evaluated: string | number | null;
  error: string | null;
  isAssignment: boolean;
}

export const parseAndEvaluateNote = (content: string): EvaluationResult[] => {
  const lines = content.split('\n');
  const variables: Record<string, number> = {};
  
  return lines.map(line => {
    const trimmedLine = line.trim();
    if (trimmedLine === '') {
      return { original: line, evaluated: null, error: null, isAssignment: false };
    }

    const assignmentMatch = trimmedLine.match(/^(\w+)\s*=\s*(.+)$/);
    
    try {
      if (assignmentMatch) {
        const [, varName, expression] = assignmentMatch;
        const value = evaluate(expression, variables);
        variables[varName] = value;
        return {
          original: line,
          evaluated: value,
          error: null,
          isAssignment: true
        };
      } else {
        const value = evaluate(trimmedLine, variables);
        return {
          original: line,
          evaluated: value,
          error: null,
          isAssignment: false
        };
      }
    } catch (error) {
      return {
        original: line,
        evaluated: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        isAssignment: !!assignmentMatch
      };
    }
  });
};