import { useEffect } from "react";

// This hook detects outside the specified component and call the provided handler function
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // define the listner function to be called on click/touch events
    const listner = (event) => {
      // If the click/touch event originated inside the ref element, do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // Otherwise, call the provided handler function
      handler(event);
    };

    // Add event listeners for mousedown and touchstart events on the document
    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);

    // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
    return () => {
      document.removeEventListener("mousedown", listner);
      document.removeEventListener("touchstart", listner);
    };
  }, [ref, handler]);
}
