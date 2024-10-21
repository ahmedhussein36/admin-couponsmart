
const useGeneratedSlug = (name: string ) => {
  const newSlug = name 
    .toLowerCase()
    .replace(/[\\|~!@#$%^&*()_+*/\-+":;,'`]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return {
    newSlug
  }
}

export default useGeneratedSlug