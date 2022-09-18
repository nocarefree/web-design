export interface InputSetting{
    type: string,
    id: string,
    label: string,
    default?: any,
    info?: any,
}

export interface Option{
    value: string,
    label: string,
}


export interface InputCheckboxSetting extends InputSetting{
    default: boolean
}

export interface InputNumberSetting extends InputSetting{
    default: number
}

export interface InputRadioSetting extends InputSetting{
    options: Option[],
    default?: string,
}

export interface InputRangeSetting extends InputSetting{
    min: number,
    max: number,
    step: number,
    unit?: string,
}

export interface InputSelectSetting extends InputSetting{
    options: Option[],
    default?: string,
}

export interface InputTextSetting extends InputSetting{
    placeholder?: string,
}

export interface InputTextareaSetting extends InputTextSetting{}


export interface SidebarSetting{
    type: string,
    id: string,
    label: string,
    default?: any,
    info?: any,
}

export interface SettingBlock{
    type: string,
    name: string,
    class?: string,
    limit?:number,
    settings?: Array<InputSetting | SidebarSetting>
}

export interface SettingPreset{
    name: string,
    settings?: object,
    blocks ?: any[],
}

export interface SettingSchema{
    name: string,
    tag?: string, 
    class?: string,
    limit?:number,
    settings: InputSetting[],
    blocks: SettingBlock[],
    max_blocks?:number,
    presets: SettingPreset,
    default: SettingPreset,
    templates ?: String[],
}