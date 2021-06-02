export const getIP = async () => {
    const response = await fetch('https://api64.ipify.org?format=json', {
           headers:{
            Accept: 'application/json',
           }, 
        });

const json = await response.json();

return json.ip;
};