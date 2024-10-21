
const useWatchField = (methods: { watch: (arg0: string) => any; }) => {
  const locale = methods.watch("locale");
  const image = methods.watch("image");
  const title = methods.watch("title");
  const slug = methods.watch("slug");
  const description = methods.watch("description");
  const metaTitle = methods.watch("metaTitle");
  const metaDescription = methods.watch("metaDescription");
  const openGraphImage = methods.watch("openGraphImage");
  const openGraphTitle = methods.watch("openGraphTitle");
  const openGraphDescription = methods.watch("openGraphDescription");




  return {
    locale,
    image,
    title,
    slug,
    description,
    metaTitle,
    metaDescription,
    openGraphImage,
    openGraphTitle,
    openGraphDescription
    
  }
}

export default useWatchField