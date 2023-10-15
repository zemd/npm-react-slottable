# react-slottable

The package provides a way to create your components in a customizable, easy-to-use, and maintainable way. Zero dependencies. 

With it, you can build your own complex component libraries, composing different components without losing control over their internals, providing a great developer experience to your team.

Sounds interesting? Just look at the example of such a `Button` built with the library:

At first install it:
```bash
npm install @zemd/react-slottable
```

then:

```typescript
import {
  type TSlottablePropsFactory,
  createSlottableComponent,
  useSlot,
  clsx,
} from "@zemd/react-slottable";

type TButtonProps = TSlottablePropsFactory<
  {
    fullWidth?: boolean;
    disabled?: boolean;
    size?: "sm" | "md" | "xl";
    variant?: "solid" | "outlined";
    color?: "primary" | "secondary";
  },
  "startDecorator" | "endDecorator" // this is how cool you can define your slots
  // in case you want control the type of slots explicitly, you can use an object:
  // { startDecorator: typeof MyCustomComponent, endDecorator: React.ElementType }
>;

export const Button = createSlottableComponent<"button", TButtonProps>(
  // params for the component are the same as you would expect from `forwardRef`
  function Button(inProps, ref) {
    const {
      component = "button", // each Slottable component is overridable by default using `component` prop, if you don't need - just Omit it
      className, // TSlottablePropsFactory provides `className` prop by default
      children, // TSlottablePropsFactory provides `children` prop by default
      startDecorator, // TSlottablePropsFactory provides ability to provide kind of `children` element for your slot
      endDecorator, // same as ^
      slots = {}, // slots are not receiving default value by default
      slotProps = {}, // as well as slotProps
      disabled, // here we just handle all props that we defined in `TButtonProps`
      fullWidth,
      size = "md",
      variant = "solid",
      color = "primary",
      ...rest
    } = inProps;

    const props = Object.assign({}, rest, { slots, slotProps }); // building a map with all important props for root slot and slot information

    const [SlotRoot, rootProps] = useSlot("root", {
      ref, // ref is mandatory for the `root` slot
      component,
      className: clsx(
        "button-default-className", // use Tailwind, jss, or any other styling solution you want
        `button__size_${size}`,
        `button__color_${color}`,
        `button__variant_${variant}`,
        "text-blue-400 text-xl text-green-500",
        {
          "button__width_full": fullWidth
        },
        className // don't forget that your users would like to customize this prop
      ),
      props,
      extraProps: {
        // optional `extraProps` field, which can include everything you want to send specifically to the slot component
      },
      // classNameMergeFn: twMerge, // if you need to normalize classNames you can pass a function reference
    });

    const [SlotStartDecorator, startDecoratorProps] = useSlot(
      "startDecorator",
      {
        component: slots["startDecorator"] ?? ("div" as ElementType),
        className: "start-decorator-className",
        props,
      }
    );

    const [SlotEndDecorator, endDecoratorProps] = useSlot("endDecorator", {
      component: slots["endDecorator"] ?? ("div" as ElementType),
      className: "end-decorator-className",
      props,
    });

    // Wow! How easy to maintain it looks!!! Such declarative!
    return (
      <SlotRoot {...rootProps}>
        {startDecorator ? (
          <SlotStartDecorator {...startDecoratorProps}>
            {startDecorator}
          </SlotStartDecorator>
        ) : null}
        {children}
        {endDecorator ? (
          <SlotEndDecorator {...endDecoratorProps}>
            {endDecorator}
          </SlotEndDecorator>
        ) : null}
      </SlotRoot>
    );
  }
);
```

Now your users can use this `Button`:

```typescript
import { Button } from "./MyButton";

export function HomePage() {
  const buttonRef = useRef(null);
  return (
    <div>
      <Button
        // ref={buttonRef} // just in case if you need
        startDecorator={<MySvgIcon />}
        endDecorator={<span>no icon. just label.</span>}
        slots={{
          endDecorator: MyCustomLabelComponent
        }}
        slotProps={{
          startDecorator: {
            prop1: "value"
          }
        }}
        className: "my-custom-button-className"
      >
        Click me!
      </Button>
    </div>
  );
}
```

The package exposes three essential parts: `createSlottableComponent`, the `useSlot` hook, and the `TSlottablePropsFactory` typescript type. Combining them together, you get a backbone for your fantastic components.

## Typescript

The package includes typescript declarations, and can hint everything you need for creating and using components.

## Additional utilities

Since the package implements some useful utilities internally, it also exposes them. Such utilities are: `clsx` and `mergeProps`. The first is fully compatible with the popular `clsx` package, and the second is suitable for deep-merging objects.

## License

The `react-slottable` is dual licensed under the **GPLv3 license** and commercial. Open-source projects are obligated to follow GPL limitations. Commercial usage must request permission. However, it would be relatively inexpensive for you to buy a license for your project.

Usage in a simple commercial project with up to two front-end developers involved would cost you **$20** one-time payment. More developers? **$10** for each.

If your company builds a component library that is used across many internal or publicly available projects and is not intended to be sold to customers, the cost will be **$100 per year**, with no developer number limit.

The price does not include any exclusive support. If you need new functionality or advice, please do not hesitate to contact me.

Any questions are welcomed via email at [hey@codeandgin.co](mailto:hey@codeandgin.co)
