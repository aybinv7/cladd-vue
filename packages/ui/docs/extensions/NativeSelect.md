# Extension specification: `NativeSelect`

NativeSelect themes a real `<select>` element — it is not a re-implementation. Every native
behavior — form submission, the OS/mobile native picker UI, `required`/`disabled`/`multiple`
constraint validation, `autocomplete`, and `<form>` reset — keeps working exactly as it does for
a bare `<select>`, because the DOM node the browser sees is one. Compose options with
`NativeSelectOption` (`<option>`) and `NativeSelectGroup` (`<optgroup>`), both near-transparent
passthroughs.

This is distinct from the existing `Select` component, which is a custom popover/listbox
implementation for rich option rendering. `NativeSelect` is for the cases that need genuine
native semantics — a real mobile picker, native form validation UI, or a plain progressive-
enhancement baseline.
