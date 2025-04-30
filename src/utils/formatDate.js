export default function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so we add 1
    const year = date.getFullYear();
  
    // Use template literals to format the date
    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
  }