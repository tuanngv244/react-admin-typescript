import SuspenseLoader from "@/components/SupenseLoader";
import { Suspense } from "react";

/**
 * Loader
 * This HOC add Suspense - fallback to handle lazy loading of input Component
 */
const withSuspenseLoader =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props: P) => {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default withSuspenseLoader;
