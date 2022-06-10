import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
  const [value, setValue] = useLocalStorage("persist", initValue);
  const toggle = () =>
    setValue((prev) => {
      return typeof prev === "boolean" ? !value : !prev;
    });
  return [value, toggle];
};

export default useToggle;
