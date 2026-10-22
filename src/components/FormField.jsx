export default function FormField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  readOnly = false,
}) {
  return (
    <label className="mb-5 block last:mb-0">
      <span className="mb-[7px] block text-[11px] font-semibold text-[#526174]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={readOnly ? undefined : event => onChange(event.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        className="w-full rounded-[7px] border border-[#d7dfe8] bg-[#fcfdfe] px-3 py-[11px] text-[13px] leading-normal text-[#29394e] outline-none transition-[border-color,box-shadow] duration-180 focus:border-navy-500 focus:shadow-[0_0_0_3px_#122a4a18]"
      />
    </label>
  )
}
