import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'vue'

export type FieldValue = string | number | boolean

export interface BaseField<Name extends string, Value> {
	name: Name
	label: string
	type: string
	options?: { label: string; value: Value }[]
}

export interface InputField<Name extends string> extends BaseField<Name, string> {
	type: 'input'
	attrs?: InputHTMLAttributes & {
		placeholder?: string
		disabled?: boolean
		type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'datetime-local'
	}
}

export interface TextareaField<Name extends string> extends BaseField<Name, string> {
	type: 'textarea'
	attrs?: TextareaHTMLAttributes & {
		placeholder?: string
		rows?: number
		disabled?: boolean
	}
}

export interface SelectField<Name extends string> extends BaseField<Name, string> {
	type: 'select'
	options: { label: string; value: string }[]
	attrs?: SelectHTMLAttributes & {
		placeholder?: string
		disabled?: boolean
	}
}

export interface CheckBoxField<Name extends string> extends BaseField<Name, boolean> {
	type: 'checkbox'
	attrs?: InputHTMLAttributes & {
		disabled?: boolean
		trueValue?: boolean
		falseValue?: boolean
	}
}

export type Field =
	| InputField<string>
	| TextareaField<string>
	| SelectField<string>
	| CheckBoxField<string>
