export const setSelectedCustomerToLocalStorage = selectedCustomer => localStorage.setItem("selectedCustomer", JSON.stringify(selectedCustomer))
export const getSelectedCustomerToLocalStorage = () => JSON.parse(localStorage.getItem("selectedCustomer"))
export const deletedSelectedCustomerToLocalStorage = () => JSON.parse(localStorage.removeItem("selectedCustomer"))