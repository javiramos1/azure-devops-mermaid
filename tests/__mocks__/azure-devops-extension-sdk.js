// Mock for Azure DevOps Extension SDK
const SDK = {
  init: jest.fn(),
  register: jest.fn(),
  notifyLoadSucceeded: jest.fn()
};

export default SDK;
