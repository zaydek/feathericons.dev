import { toKebabCase } from "../lib/cases"
import { manifest } from "./react-feather-manifest"

// Shorthand for kebab-case keys
export const keys = Object.keys(manifest).map(name => toKebabCase(name))
