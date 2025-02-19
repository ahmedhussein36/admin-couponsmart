export function cleanObject(obj: Record<string, any>) {
    return Object.fromEntries(
        Object.entries(obj).filter(
            ([_, value]) =>
                value !== "" && value !== null && value !== undefined
        )
    );
}
