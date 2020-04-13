export function asIsoString(date: Date): string {
	date.setHours(0, 0, 0, 0);
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
}

export function todayAsIsoString(): string {
	return asIsoString(new Date());
}
