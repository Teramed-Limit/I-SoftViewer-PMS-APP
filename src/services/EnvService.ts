let ipAddress = '127.0.0.1';
let dateFormat = 'yyyy/MM/dd';
let dateTimeFormat = 'yyyy/MM/dd HH:mm';
let ersUrl = 'http://';

const getIpAddress = () => {
	return ipAddress;
};

const setIpAddress = (value: string) => {
	ipAddress = value;
};

const getDateFormat = () => {
	return dateFormat;
};

const setDateFormat = (value: string) => {
	dateFormat = value;
};

const getDateTimeFormat = () => {
	return dateTimeFormat;
};

const setDateTimeFormat = (value: string) => {
	dateTimeFormat = value;
};

const getERSUrl = () => {
	return ersUrl;
};
const setERSUrl = (value: string) => {
	ersUrl = value;
};

const EnvService = {
	getIpAddress,
	setIpAddress,
	getDateFormat,
	setDateFormat,
	getDateTimeFormat,
	setDateTimeFormat,
	getERSUrl,
	setERSUrl,
};

export default EnvService;
