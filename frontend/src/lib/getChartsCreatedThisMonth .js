export const getChartsCreatedThisMonth = (userData) => {

    if(!userData) return 0
  const charts = userData?.user?.charts;
 
  
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const chartsThisMonth = charts?.filter((chart) => {
    const chartDate = new Date(chart?.uploadedAt);
    return (
      chartDate.getFullYear() === currentYear &&
      chartDate.getMonth() + 1 === currentMonth
    );
  });

  return chartsThisMonth?.length;
};