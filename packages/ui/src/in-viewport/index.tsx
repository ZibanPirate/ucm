import { Component, createRef, HTMLProps } from "react";

export interface InViewportProps extends HTMLProps<HTMLDivElement> {
  onVisibilityChanged: (action: "entered" | "left") => void;
}

/**
 * Internet Explorer is not supported
 * @see: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#browser_compatibility
 */
export class InViewport extends Component<InViewportProps> {
  ref = createRef<HTMLDivElement>();

  componentDidMount() {
    new IntersectionObserver(
      (entries) => this.props.onVisibilityChanged(entries[0].isIntersecting ? "entered" : "left"),
      { root: null, rootMargin: "10px", threshold: 1 },
    ).observe(this.ref.current as HTMLDivElement);
  }

  render() {
    return <div {...this.props} ref={this.ref} />;
  }
}
