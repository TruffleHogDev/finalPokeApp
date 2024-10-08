export async function loader({ params }: LoaderFunctionArgs) {
  const filePath = params["*"];
  return fake.getFileInfo(filePath);
}
