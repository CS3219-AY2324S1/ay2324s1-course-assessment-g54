import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Selector = (props) => {
  const { id = "", label, options, value, onChange } = props;

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={`${id ? `${id}-` : ""}-selector-label`}>
          {label}
        </InputLabel>
        <Select
          labelId={`${id ? `${id}-` : ""}-selector-label`}
          id={`${id ? `${id}-` : ""}-selector`}
          label={label}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.substring(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Selector;
