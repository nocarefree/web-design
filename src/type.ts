export interface ModuleBlock{
    id: string ,
	name: string,
	json ?: any,
	label ?: string,
	blocks ?: ModuleBlock[],
}
