const QueryResultPage = ({
  params: { food },
}: {
  params: { food: string };
}) => {
  return (
    <div>
      <h1>
        Showing results for <span>{food}</span>
      </h1>
    </div>
  );
};

export default QueryResultPage;
