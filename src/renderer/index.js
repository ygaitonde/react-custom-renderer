const Reconciler = require("react-reconciler");

const HostConfig = {
  // TODO specify req methods
};

// create an instance of the reconciler
const reconcilerInstance = Reconciler(HostConfig);

const CustomRenderer = {
  // element: This is the react element for App component
  // renderDom: This is the host root element to which the rendered app will be attached.
  // callback: if specified will be called after render is done.
  render(element, renderDom, callback) {
    // disable async rendering
    const isAsync = false;
    // Creates root fiber node.
    const container = reconcilerInstance.createContainer(renderDom, isAsync);

    // Since there is no parent (since this is the root fiber). We set parentComponent to null.
    // The root fiber node will be used by the reconciler to manage all the updates to the renderDom.
    const parentComponent = null;
    // initiate reconcilation and the subsequent rendering.
    reconcilerInstance.updateContainer(
      element,
      container,
      parentComponent,
      callback
    );
  },
};

module.exports = CustomRenderer;
