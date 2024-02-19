export default function FormInput({ label, inputType, required }) {
  return (
    <div>
      <label>{label}</label>
      {inputType === "input" ? (
        <input name={label.toLowerCase()} type="text" required={required} />
      ) : (
        <textarea name={label.toLowerCase()} required={required}></textarea>
      )}
    </div>
  );
}
