import { createContext, useState, useEffect } from 'react';

// Storage keys
const USERS_STORAGE_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';
const SELECTED_CARD_KEY = 'selected_card';
const SELECTED_LOCATION_KEY = 'selected_location';

// Default user for first-time setup
const DEFAULT_USERS = [
  {
    email: 'john@comprafacil.com',
    password: 'comprafacil1234',
    locations: [
      {
        name: 'John',
        address: '123 Main St, Springfield, USA',
        neighborhood: 'Downtown',
      }
    ],
    creditCards: [
      {
        number: '5321132564511231',
        expiration_month: '12',
        expiration_year: '2030',
        owner: 'John Doe',
      }
    ],
    selectedCreditCard: null,
    selectedLocation: null,
  }
];

/**
 * @typedef {Object} Location
 * @property {string} name - User-designated name for the location
 * @property {string} address - Full address
 * @property {string} neighborhood - Neighborhood name
 */

/**
 * @typedef {Object} CreditCard
 * @property {string} number - Credit card number (for demo purposes only)
 * @property {string} expiration_month - Expiration month (MM)
 * @property {string} expiration_year - Expiration year (YYYY)
 * @property {string} owner - Name of the card owner
 */

/**
 * @typedef {Object} User
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {Location[]} locations - User's saved locations
 * @property {CreditCard[]} creditCards - User's saved credit cards
 * @property {CreditCard} selectedCreditCard - User's selected credit card for payment
 * @property {Location} selectedLocation - User's selected location for payment
 */

export const UserContext = createContext({
  users: /** @type {User[]} */ ([]),
  addUser: /** @type {(newUser: {email: string, password: string}) => {success: boolean, message: string}} */ (() => { }),
  user: /** @type {User|null} */ (null),
  setUser: /** @type {(user: User|null) => void} */ (() => { }),
  addLocation: /** @type {(location: Location) => {success: boolean, message: string}} */ (() => { }),
  removeLocation: /** @type {(selectedLocation: Location) => {success: boolean, message: string}} */ (() => { }),
  addCreditCard: /** @type {(creditCard: CreditCard) => {success: boolean, message: string}} */ (() => { }),
  removeCreditCard: /** @type {(selectedCreditCard: CreditCard) => {success: boolean, message: string}} */ (() => { }),

  // Payment Process: The selected payment details from the user
  selectCreditCard: /** @type {(selectedCreditCard: CreditCard) => {success: boolean, message: string}} */ (() => { }),
  selectLocation: /** @type {(selectedLocation: Location) => {success: boolean, message: string}} */ (() => { }),
  clearSelectedPaymentDetails: /** @type {() => void} */ (() => { }),
});

export const UserProvider = ({ children }) => {
  // Initialize states from localStorage or defaults
  const [users, setUsers] = useState(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      return storedUsers ? JSON.parse(storedUsers) : DEFAULT_USERS;
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
      return DEFAULT_USERS;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error loading current user from localStorage:', error);
      return null;
    }
  });

  // Persist users to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }, [users]);

  // Persist current user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (error) {
      console.error('Error saving current user to localStorage:', error);
    }
  }, [user]);

  /**
   * Add a new user
   * @param {{email: string, password: string}} newUser - User to add
   * @returns {{success: boolean, message: string}} Result of the operation
   */
  const addUser = (newUser) => {
    // Validate required fields
    if (!newUser.email || !newUser.password) {
      return { success: false, message: 'Email y contraseña son requeridos' };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      return { success: false, message: 'Formato de email inválido' };
    }

    // Check if user already exists
    const userExists = users.some(u => u.email === newUser.email);
    if (userExists) {
      return { success: false, message: 'Este correo ya está registrado' };
    }

    // Add user to the array
    setUsers(prevUsers => [...prevUsers, {
      email: newUser.email,
      password: newUser.password,
      locations: [],
      creditCards: [],
      selectedCreditCard: null,
      selectedLocation: null,
    }]);

    return { success: true, message: 'Usuario registrado exitosamente' };
  };

  /**
   * Add a new location for the current user
   * @param {Location} location - Location to add
   * @returns {{success: boolean, message: string}} Result of the operation
   */
  const addLocation = (location) => {
    // Check if user is logged in
    if (!user) {
      return { success: false, message: 'Debe iniciar sesión para agregar una dirección' };
    }

    // Validate required fields
    if (!location.name || !location.address || !location.neighborhood) {
      return { success: false, message: 'Todos los campos de la dirección son requeridos' };
    }

    // Check if location name already exists
    const locationExists = user.locations.some(loc => loc.name === location.name);
    if (locationExists) {
      return { success: false, message: 'Ya existe una dirección con este nombre' };
    }

    // Add location to user's locations array
    const updatedUser = {
      ...user,
      locations: [...user.locations, location]
    };

    // Update current user and users array
    setUser(updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.email === user.email ? updatedUser : u
      )
    );

    return { success: true, message: 'Dirección agregada exitosamente' };
  };

  /**
   * Remove a location from the current user
   * @param {Location} selectedLocation - Location to remove
   * @returns {{success: boolean, message: string}} Result of the operation
   */
  const removeLocation = (selectedLocation) => {
    // Check if user is logged in
    if (!user) {
      return { success: false, message: 'Debe iniciar sesión para eliminar una dirección' };
    }

    // Check if location exists
    const locationExists = user.locations.some(loc => loc === selectedLocation);
    if (!locationExists) {
      return { success: false, message: 'No se encontró la dirección especificada' };
    }

    // Remove location from user's locations array
    const updatedUser = {
      ...user,
      locations: user.locations.filter(loc => loc !== selectedLocation),
      selectedLocation: null
    };

    // Update current user and users array
    setUser(updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.email === user.email ? updatedUser : u
      )
    );

    return { success: true, message: 'Dirección eliminada exitosamente' };
  };

  /**
   * Add a new credit card for the current user
   * @param {CreditCard} creditCard - Credit card to add
   * @returns {{success: boolean, message: string}} Result of the operation
   */
  const addCreditCard = (creditCard) => {
    // Check if user is logged in
    if (!user) {
      return { success: false, message: 'Debe iniciar sesión para agregar una tarjeta' };
    }

    // Validate required fields
    if (!creditCard.number || !creditCard.expiration_month ||
      !creditCard.expiration_year || !creditCard.owner) {
      return { success: false, message: 'Todos los campos de la tarjeta son requeridos' };
    }

    // Validate if card already exists
    const cardExists = user.creditCards.some(card => card.number === creditCard.number);
    if (cardExists) {
      return { success: false, message: 'Esta tarjeta ya está registrada' };
    }

    // Validate if card number has 16 digits
    if (creditCard.number.length !== 16) {
      return { success: false, message: 'El número de la tarjeta debe tener 16 dígitos' };
    }

    // Validate if expiration date is valid
    const today = new Date();
    const expirationDate = new Date(`${creditCard.expiration_year}-${creditCard.expiration_month}-01`);
    if (expirationDate < today) {
      return { success: false, message: 'La tarjeta ya ha expirado, intente con otra tarjeta nuevamente' };
    }

    // Add credit card to user's creditCards array
    const updatedUser = {
      ...user,
      creditCards: [...user.creditCards, creditCard]
    };

    // Update current user and users array
    setUser(updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.email === user.email ? updatedUser : u
      )
    );

    return { success: true, message: 'Tarjeta agregada exitosamente' };
  };

  /**
   * Remove a credit card from the current user
   * @param {CreditCard} selectedCreditCard - Selected card object
   * @returns {{success: boolean, message: string}} Result of the operation
   */
  const removeCreditCard = (selectedCreditCard) => {
    // Check if user is logged in
    if (!user) {
      return { success: false, message: 'Debe iniciar sesión para eliminar una tarjeta' };
    }

    // Check if card exists
    const cardExists = user.creditCards.some(card => card === selectedCreditCard);
    if (!cardExists) {
      return { success: false, message: 'No se encontró la tarjeta especificada' };
    }

    // Remove credit card from user's creditCards array
    const updatedUser = {
      ...user,
      creditCards: user.creditCards.filter(card => card !== selectedCreditCard),
      selectedCreditCard: null
    };

    // Update current user and users array
    setUser(updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.email === user.email ? updatedUser : u
      )
    );

    return { success: true, message: 'Tarjeta eliminada exitosamente' };
  };

  /**
 * Select a credit card for the payment process
 * @param {CreditCard} selectedCreditCard - Selected card object
 * @returns {{success: boolean, message: string}} Result of the operation
 */
  const selectCreditCard = (selectedCreditCard) => {
    // Check if user is logged in
    if (!user) {
      return { success: false, message: 'Debe iniciar sesión para seleccionar una tarjeta' };
    }

    // Check if user has credit cards
    if (!user.creditCards || user.creditCards.length === 0) {
      return { success: false, message: 'No tienes tarjetas de crédito registradas. Debes agregar una tarjeta para seleccionarla y continuar con tu compra' };
    }

    // Check if card number is provided
    if (!selectedCreditCard) {
      return { success: false, message: 'Debes seleccionar una tarjeta de crédito' };
    }

    // Find the card in user's creditCards
    const card = user.creditCards.find(card => card === selectedCreditCard);

    // Check if card exists
    if (!card) {
      return { success: false, message: 'La tarjeta seleccionada no existe' };
    }

    // Update the user object with the selected card
    const updatedUser = {
      ...user,
      selectedCreditCard: card
    };

    // Update current user and users array
    setUser(updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.email === user.email ? updatedUser : u
      )
    );

    return { success: true, message: 'Tarjeta seleccionada exitosamente' };
  };

  /**
 * Select a location for the payment process
 * @param {Location} location - Name of the selected location
 * @returns {{success: boolean, message: string}} Result of the operation
 */
  const selectLocation = (selectedLocation) => {
    // Check if user is logged in
    if (!user) {
      return { success: false, message: 'Debe iniciar sesión para seleccionar una dirección' };
    }

    // Check if user has locations
    if (!user.locations || user.locations.length === 0) {
      return { success: false, message: 'No tienes direcciones registradas. Debes agregar una dirección para seleccionarla y continuar con tu compra.' };
    }

    // Check if location is provided
    if (!selectedLocation) {
      return { success: false, message: 'Debes seleccionar una dirección' };
    }

    // Find the location in user's locations
    const location = user.locations.find(location => location === selectedLocation);

    // Check if location exists
    if (!location) {
      return { success: false, message: 'La dirección seleccionada no existe' };
    }

    // Update the user object with the selected location
    const updatedUser = {
      ...user,
      selectedLocation: location
    };

    // Update current user and users array
    setUser(updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.email === user.email ? updatedUser : u
      )
    );

    return { success: true, message: 'Dirección seleccionada exitosamente' };
  };

  /**
  * Clear selected payment details
  */
  const clearSelectedPaymentDetails = () => {
    // Clear payment details from the user object in localStorage
    if (user) {
      const updatedUser = {
        ...user,
        selectedCreditCard: null,
        selectedLocation: null,
      };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }
  };

  // Create the context value
  const value = {
    users,
    addUser,
    user,
    setUser,
    addLocation,
    removeLocation,
    addCreditCard,
    removeCreditCard,
    selectCreditCard,
    selectLocation,
    clearSelectedPaymentDetails
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
