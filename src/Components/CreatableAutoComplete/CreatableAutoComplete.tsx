import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const filter = createFilterOptions<any>();

interface Props {
	value: any;
	onValueChange: (value: any) => void;
	options: any[];
	labelKey: string;
	valueKey: string;
}

export default function CreatableAutoComplete({ value, onValueChange, options, labelKey, valueKey }: Props) {
	return (
		<Autocomplete
			value={value}
			onChange={(_event, newValue) => {
				if (typeof newValue === 'string') {
					onValueChange({
						[labelKey]: newValue,
						[valueKey]: newValue,
					});
				}
				// 新增選項
				else if (newValue && newValue.inputValue) {
					onValueChange({
						[labelKey]: newValue.inputValue,
						[valueKey]: newValue.inputValue,
					});
				} else {
					onValueChange(newValue);
				}
			}}
			filterOptions={(opts, params) => {
				const filtered = filter(opts, params);

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = opts.some((option) => inputValue === option[labelKey]);
				if (inputValue !== '' && !isExisting) {
					filtered.push({ inputValue });
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			options={options}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === 'string') {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return `Add ${option.inputValue}`;
				}
				// Regular option
				return option[labelKey];
			}}
			sx={{ width: 300 }}
			freeSolo
			renderInput={(params) => <TextField {...params} variant="standard" label="" />}
		/>
	);
}
