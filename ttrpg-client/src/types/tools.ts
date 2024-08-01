const tools = ['pointer', 'brush', 'terraform', 'eyedropper'] as const
export type Tool = (typeof tools)[number]
