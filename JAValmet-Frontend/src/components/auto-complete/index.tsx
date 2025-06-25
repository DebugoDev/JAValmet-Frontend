import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';

export interface IOption {
    inputValue?: string;
    name: string;
    value?: string;
}

interface AutoCompleteProps {
    label: string
    options: {
        get: IOption[],
        add: (name: string) => IOption
    }
}

const filter = createFilterOptions<IOption>();

const AutoComplete = ({ label, options }: AutoCompleteProps) => {

    const { t } = useTranslation();

    const [value, setValue] = React.useState<IOption | null>(null);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                let selected: IOption | null = null;

                if (typeof newValue === 'string')
                    // selected = { name: newValue, value: String(Date.now()) };
                    selected = options.add(newValue);
                else if (newValue && newValue.inputValue)
                    // selected = { name: newValue.inputValue, value: String(Date.now()) };
                    selected = options.add(newValue.inputValue);
                else
                    selected = newValue;


                // if (selected && !options.get.some(opt => opt.name === selected!.name)) {
                //     // setOptions(prev => [...prev, nova!]);
                //     options.add(selected);
                // }
                setValue(selected);
            }}
            filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                const { inputValue } = params;
                const isExisting = opts.some(o => o.name.toLowerCase() === inputValue.toLowerCase());

                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `${t("add")} "${inputValue}"`,
                    });
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={options.get}
            getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                if (option.inputValue) return option.inputValue;
                return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            renderInput={(params) => <TextField {...params} label={label} />}
            freeSolo
            disablePortal
            slotProps={{
                popper: {
                    sx: { zIndex: 1400 },
                },
            }}
        />
    );
}

export default AutoComplete;