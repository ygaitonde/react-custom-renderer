const Reconciler = require("react-reconciler");

const HostConfig = {
  // This function lets you share some context with the other functions in this HostConfig.
  getRootHostContext: function (nextRootInstance) {
    let rootContext = {};
    return rootContext;
  },
  // This function provides a way to access context from the parent and also a way to pass some context to the
  // immediate children of the current node. Context is basically a regular object containing some information.
  getChildHostContext: function (parentContext, fiberType, rootInstance) {
    let context = {};
    return context;
  },
  shouldSetTextContent: function (type, nextProps) {
    return false;
  },
  // Here we specify how should renderer handle the text content
  createTextInstance: function (
    newText,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    return document.createTextNode(newText);
  },
  // Called on all host nodes except the leaf text nodes. So we should return the correct view element for each host type here.
  // We are also supposed to take care of the props sent to the host element.
  createInstance: function (
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    const element = document.createElement(type);
    element.className = newProps.className || "";
    element.style = newProps.style;
    // ....
    // ....
    // if (newProps.onClick) {
    //   element.addEventListener('click', newProps.onClick)
    // }
    return element;
  },
  // Attach the child dom node to the parent on the initial render phase.
  // This method will be called for each child of the current node.
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  // In case of react-dom, this adds default dom properties such as event listeners, etc.
  finalizeInitialChildren: (
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext
  ) => {
    return true;
  },
  // Here we can do any preparation that needs to be done on the rootContainer before attaching the in memory render tree.
  prepareForCommit: function (rootContainerInstance) {},
  // This function gets executed after the inmemory tree has been attached to the root dom element.
  // Here we can do any post attach operations that needs to be done.
  // For example: react-dom re-enabled events which were temporarily disabled in prepareForCommit and refocuses elements, etc.
  resetAfterCommit: function (rootContainerInstance) {},
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  clearContainer: (...props) => {},
  // This function is called for every element that has set the return value of finalizeInitialChildren to true.
  // This method is called after all the steps are done (ie after resetAfterCommit), meaning the entire tree has been attached to the dom.
  // This method is mainly used in react-dom for implementing autofocus
  commitMount: (domElement, type, newProps, fiberNode) => {
    domElement.focus();
  },
  supportsMutation: true,
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
