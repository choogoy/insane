const repairData = () => {
    const DB = '.../../crm-backend/db.json';

    const getData = async url => {
        const response = await fetch(url);
        return await response.json();
    };
    
    return getData(DB).then(data => data);
};

export default repairData;