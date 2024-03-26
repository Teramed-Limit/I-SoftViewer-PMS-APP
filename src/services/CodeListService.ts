const codeList = {};

const getCodeList = <T>(key: string): T[] => {
	return codeList[key];
};

const addCodeList = (key: string, options: any[]) => {
	codeList[key] = options;
};

const CodeListService = {
	getCodeList,
	addCodeList,
};

export default CodeListService;
