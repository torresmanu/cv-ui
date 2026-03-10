import async from "../components/Async";

// NOTE: All routes must be public now, so these helpers are intentionally
// implemented as simple async loaders without any authentication logic.

export const NeedsLogin = (component) => async(component);

export const NoLogin = (component) => async(component);
