// function that combines postgres and mongo queries to search for cars
const searchCars = async (search) => {
  try {
    // Search in PostgreSQL
    const postgresResult = await getCarsPostgres(search);

    // Search in MongoDB
    const mongoResult = await getCarsMongo(search);

    // Combine the results
    const combinedResult = [...postgresResult, ...mongoResult];

    return combinedResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
