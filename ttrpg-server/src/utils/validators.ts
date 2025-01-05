import { ZodIssue, ZodSchema } from 'zod'
import { Character } from 'types/characters'
import { ListContext } from 'types/lists'

type Validator<T> =
  | { success: true; data: T }
  | { success: false; errors: ZodIssue[] }

export const validate = <T>(
  schema: ZodSchema,
  input: unknown,
): Validator<T> => {
  const result = schema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true, data: result.data }
}

export const validateCharacter = (schema: ZodSchema, character: unknown) =>
  validate<Character>(schema, character)

export const validateListRequestContext = (
  schema: ZodSchema,
  context: unknown,
) => validate<Partial<Record<keyof ListContext, string>>>(schema, context)

export const validateListContext = (schema: ZodSchema, context: unknown) =>
  validate<ListContext>(schema, context)
