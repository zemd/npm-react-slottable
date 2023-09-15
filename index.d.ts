import { ElementType, ComponentProps, CSSProperties, Ref, ComponentPropsWithRef, PropsWithChildren, ReactNode, ForwardedRef, ForwardRefRenderFunction } from 'react';

type TClassValue = TClassArray | TClassMap | string | number | boolean | null | undefined;
type TClassArray = Array<TClassValue>;
type TClassMap = Record<string, any>;

interface TComponentConfig {
    props: {};
    defaultComponent: ElementType;
}
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
type TOverridableComponentProps<TArgComponentConfig extends TComponentConfig, TArgComponentType extends ElementType> = (TArgComponentConfig["props"] & DistributiveOmit<ComponentPropsWithRef<TArgComponentType>, keyof TArgComponentConfig["props"]>);
type DefaultComponentProps<TArgComponentConfig extends TComponentConfig> = TArgComponentConfig["props"] & DistributiveOmit<ComponentPropsWithRef<TArgComponentConfig['defaultComponent']>, keyof TArgComponentConfig["props"]>;
interface TOverridableComponent<TArgComponentConfig extends TComponentConfig> {
    <TArgComponentType extends ElementType>(props: {
        component: TArgComponentType;
    } & TOverridableComponentProps<TArgComponentConfig, TArgComponentType>): JSX.Element | null;
    (props: DefaultComponentProps<TArgComponentConfig>): JSX.Element | null;
    propTypes?: any;
}
type TSlotMap<TArgSlotName extends string> = {
    [SlotName in TArgSlotName]?: ElementType;
};
type TSlotComponentType<TArgComponentName extends string, TArgSlotMap extends TSlotMap<TArgComponentName>, TArgComponentType extends ElementType> = TArgSlotMap[TArgComponentName] extends ElementType ? ComponentProps<TArgSlotMap[TArgComponentName]> : ComponentProps<TArgComponentType>;
type TSlotProps<TArgComponentName extends string, TArgSlotMap extends TSlotMap<TArgComponentName>, TArgComponentType extends ElementType> = {
    [Name in TArgComponentName]?: TSlotComponentType<Name, TArgSlotMap, TArgComponentType>;
};
type TComponentWithSlotsAndProps<TArgSlotMap extends TSlotMap<string>, TArgSlotProps extends TSlotProps<string, TArgSlotMap, ElementType>> = {
    slots?: TArgSlotMap;
    slotProps?: {
        [P in keyof TArgSlotProps]?: TArgSlotProps[P];
    };
};
type TComponentDefProp<TComponentType extends ElementType = ElementType> = {
    component?: TComponentType;
};
type PropsWithComponent<TComponentType extends ElementType, TProps = unknown> = TComponentDefProp<TComponentType> & Omit<TProps, "component">;
type TCommonProps = {
    className?: string;
    style?: CSSProperties;
    ref?: Ref<any>;
};
type TSlotProp<TArgComponentType extends ElementType, TArgExtraProps = unknown> = TArgExtraProps & TComponentDefProp<TArgComponentType> & ComponentPropsWithRef<TArgComponentType> & Record<string, unknown>;
type TSlottable<TArgComponentConf extends TComponentConfig, TArgStaticProps> = TOverridableComponent<TArgComponentConf> & {
    displayName: string;
} & TArgStaticProps;
type TSlottableConfigFactory<TArgProps, TArgComponentType extends ElementType> = {
    props: TArgProps;
    defaultComponent: TArgComponentType;
};
type TSlottableFactory<TArgProps extends {} = {}, TArgComponentType extends ElementType = ElementType, TArgStaticProps = {}> = TSlottable<TSlottableConfigFactory<TArgProps, TArgComponentType>, TArgStaticProps>;
type TObjectSlotDef = {
    [K in string]: ElementType;
};
type TMaybeSlotDef = string | TObjectSlotDef;
type TSlottablePropsFactory<TArgProps, TArgSlotDef extends TMaybeSlotDef = {}> = PropsWithChildren<{
    slots?: {
        [K in TArgSlotDef extends string ? TArgSlotDef : keyof TArgSlotDef]?: TArgSlotDef extends TObjectSlotDef ? TArgSlotDef[K] : ElementType;
    };
    slotProps?: {
        [K in TArgSlotDef extends string ? TArgSlotDef : keyof TArgSlotDef]?: TArgSlotDef extends TObjectSlotDef ? ComponentProps<TArgSlotDef[K]> : ComponentProps<ElementType>;
    };
} & Omit<TCommonProps, "ref"> & TArgProps & {
    component?: ElementType;
} & Partial<Record<TArgSlotDef extends string ? TArgSlotDef : keyof TArgSlotDef, ReactNode>>>;

type TMergeFn = (className: string) => string;
declare function useSlot<TArgThisSlotName extends string, TArgComponentType extends ElementType, TArgSlotMap extends TSlotMap<TArgThisSlotName>, TArgSlotProps extends TSlotProps<TArgThisSlotName, TArgSlotMap, TArgComponentType>, TResultComponentType extends TSlotComponentType<TArgThisSlotName, TArgSlotMap, TArgComponentType>, TArgProps extends TCommonProps & TComponentDefProp<TResultComponentType> & TComponentWithSlotsAndProps<TArgSlotMap, TArgSlotProps> & ComponentProps<TResultComponentType> & Record<string, unknown>>(name: TArgThisSlotName, params: (TArgThisSlotName extends "root" ? {
    ref: ForwardedRef<any>;
} : {
    ref?: ForwardedRef<any>;
}) & {
    className?: TClassValue;
    component: TArgComponentType;
    props: TArgProps;
    extraProps?: TCommonProps & ComponentProps<TResultComponentType>;
    classNameMergeFn?: TMergeFn;
}): [TResultComponentType, {
    className: string;
} & TArgSlotProps[TArgThisSlotName] & ComponentProps<TResultComponentType> & Record<string, unknown>];

declare function createSlottableComponent<TArgComponentType extends ElementType, TArgProps extends Record<string, unknown> = {}, TArgRefInstance = unknown, TArgStaticProps = {}, TReturns extends TSlottableFactory<TArgProps, TArgComponentType, TArgStaticProps> = TSlottableFactory<TArgProps, TArgComponentType, TArgStaticProps>>(render: ForwardRefRenderFunction<TArgRefInstance, TArgProps>, displayName?: string): TReturns;

export { type PropsWithComponent, type TCommonProps, type TComponentConfig, type TComponentDefProp, type TComponentWithSlotsAndProps, type TSlotComponentType, type TSlotMap, type TSlotProp, type TSlotProps, type TSlottable, type TSlottableConfigFactory, type TSlottableFactory, type TSlottablePropsFactory, createSlottableComponent, useSlot };
