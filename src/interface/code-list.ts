export interface CodeListMap {
	[props: string]: CodeList[];
}

export interface CodeList {
	id: number;
	label: string;
	value: string;
	codeName: string;
	parentCodeValue: string;
	orderingIndex: number;
}
