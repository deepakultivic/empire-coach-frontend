import { toast } from 'react-hot-toast';
import React from 'react';
export const isNullOrEmpty = (data) => {
    return (
        data === null ||
        data === undefined ||
        data === '' ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === 'object' && Object?.keys(data).length === 0)
    );
};

// export const showToast = (message = '', type = 'info') => {
//     if (isNullOrEmpty(message) || isNullOrEmpty(type) || !type) {
//         return;
//     }
//
//     toast(message, { type, toastId: message });
// };
export const capitalize = (str) => {
  if (!str) return str; // Handle null or undefined strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
 
const allowedTypes = ['success', 'error', 'info', 'loading'];

export const showToast = (message = '', type = 'info', options = {}) => {
    if (!message) return;

    const toastType = allowedTypes.includes(type) ? type : 'info';

    toast(message, {
        type: toastType,
        id: options.id || message, // fallback to message if no custom id
        duration: options.duration || 4000,
        position: options.position || 'top-center',
        ...options, // spread other custom react-hot-toast options
    });
};


export function serialize(obj) {
    let str = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (Array.isArray(obj[p])) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p].join(',')));
            } else {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
    }
    return str.join("&");
}

export const createOptionListForSelectTag = (data = null, label = "", value = "", suffix = "", overrideLabel = "") => {
    let list = [];

    if (isNullOrEmpty(data) || isNullOrEmpty(label) || isNullOrEmpty(value)) {
        return list;
    }

    if (!Array.isArray(data)) {
        return list;
    }

    list = data?.map(cur => {
        const labelText =
            (isNullOrEmpty(overrideLabel) || isNullOrEmpty(cur[overrideLabel]))
                ? cur[label]
                : cur[overrideLabel];

        return {
            value: cur[value],
            label: labelText + (isNullOrEmpty(suffix) ? "" : " (" + cur[suffix] + ")"),
        };
    });

    return list;
};


export const validatePassword = (password, confirmPassword) => {
    const regexForUppercase = new RegExp("(?=.*[A-Z])");
    const regexForLowercase = new RegExp("(?=.*[a-z])");
    const regexForNum = new RegExp(/\d/);
    const regexForSpecialChar = new RegExp("(?=.*\\W)");
    const regexForLength = new RegExp(/^.{12,50}$/);

    let error = {
        isValidSubmission: false,
    };

    if (!regexForUppercase.test(password)) {
        error.uppercaseChar = "Must contain at least one uppercase letter (A - Z)";
    } else {
        error.uppercaseCheck = "true";
    }

    if (!regexForLowercase.test(password)) {
        error.lowercaseChar = "Must contain at least one lowercase letter (a - z)";
    } else {
        error.lowercaseCheck = "true";
    }

    if (!regexForNum.test(password)) {
        error.number = "Must contain at least one number (0 - 9)";
    } else {
        error.numberCheck = "true";
    }

    if (!regexForSpecialChar.test(password)) {
        error.specialChar = "Must contain at least one special character (e.g. !, #, $, %)";
    } else {
        error.specialCharCheck = "true";
    }

    if (!regexForLength.test(password)) {
        error.length = "Must contain between 12 and 50 characters";
    } else {
        error.lengthCheck = "true";
    }

    if (password !== confirmPassword && confirmPassword !== null && confirmPassword !== "") {
        error.match = "Password and Confirm Password don't match!";
    } else {
        error.match = "";
    }

    error.isValidSubmission =
        regexForUppercase.test(password) &&
        regexForLowercase.test(password) &&
        regexForNum.test(password) &&
        regexForSpecialChar.test(password) &&
        regexForLength.test(password);

    if (error.isValidSubmission) {
        delete error.uppercaseChar;
        delete error.lowercaseChar;
        delete error.number;
        delete error.specialChar;
        delete error.length;
    }

    return error;
};

export const getClassByType = (type) => {
  const classMap = {
    submitted: 'class-submitted',
    cancelled: 'class-cancelled',
    awaiting_for_cancellation: 'class-awaiting-for-cancellation',
    approved: 'class-approved',
    PO_missing: 'class-PO_missing',
    rescheduled: 'class-rescheduled',
    delivery_link_sent: 'class-delivery_link_sent',
  };

  return classMap[type?.toLowerCase()] || 'default-class';
};

export const formatDateToMDY = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const month = date.getUTCMonth() + 1; // months are 0-based
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
};

export const formatTimeTo12Hour = (timeString) => {
  if (!timeString) return '';

  const [hourStr, minuteStr] = timeString.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // convert 0 -> 12

  return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
};


export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};


export const fetchSnappedLocation = async (lat, lng) => {
  const path = `${lat},${lng}`;
  const response = await fetch(
    `https://roads.googleapis.com/v1/snapToRoads?path=${path}&interpolate=false&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
  );
  const data = await response.json();
  if (data.snappedPoints && data.snappedPoints.length > 0) {
    return {
      lat: data.snappedPoints[0].location.latitude,
      lng: data.snappedPoints[0].location.longitude,
    };
  }
  return { lat, lng };
};

// utils/getLastLoginText

export function getLastLoginText(lastLoginDate) {
  if (!lastLoginDate) return "Last login time not available";

  const now = new Date();
  const loginTime = new Date(lastLoginDate);
  const diffMs = now - loginTime;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (seconds < 60) return "Last login: just now";
  if (minutes < 60) return `Last login: ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `Last login: ${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7) return `Last login: ${days} day${days !== 1 ? "s" : ""} ago`;

  return `Last login: ${loginTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}`;
}

export const validateRequiredFields = (fields) => {
  for (const field of fields) {
    if (String(field.value ?? "").trim() === "") {
      return `${field.label} is required.`;
    }
  }
  return null;
};
export default function useClickOutside(ref, callback) {
  React.useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}