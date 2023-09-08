import { ElementType, ComponentProps, CSSProperties, Ref, ComponentPropsWithRef, ForwardedRef, ForwardRefRenderFunction } from 'react';

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
type TCommonProps = {
    className?: string;
    style?: CSSProperties;
    ref?: Ref<any>;
};
type TSlottable<TArgComponentConf extends TComponentConfig, TArgStaticProps> = TOverridableComponent<TArgComponentConf> & {
    displayName: string;
} & TArgStaticProps;
type TSlottableConfigFactory<TArgProps, TArgComponentType extends ElementType> = {
    props: TArgProps;
    defaultComponent: TArgComponentType;
};
type TSlottableFactory<TArgProps extends {} = {}, TArgComponentType extends ElementType = ElementType, TArgStaticProps = {}> = TSlottable<TSlottableConfigFactory<TArgProps, TArgComponentType>, TArgStaticProps>;

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
    classNameMergeFn: TMergeFn;
}): [TResultComponentType, {
    className: string;
} & TArgSlotProps[TArgThisSlotName] & ComponentProps<TResultComponentType> & Record<string, unknown>];

declare function createSlottableComponent<TArgComponentType extends ElementType, TArgProps extends Record<string, unknown> = {}, TArgRefInstance = unknown, TArgStaticProps = {}, TReturns extends TSlottableFactory<TArgProps, TArgComponentType, TArgStaticProps> = TSlottableFactory<TArgProps, TArgComponentType, TArgStaticProps>>(render: ForwardRefRenderFunction<TArgRefInstance, TArgProps>, displayName?: string): TReturns;

export { createSlottableComponent, useSlot };
