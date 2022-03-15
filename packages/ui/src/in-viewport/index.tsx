import { Component, createRef } from "react";

export interface InViewportProps {
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
    return <div ref={this.ref} />;
  }
}
