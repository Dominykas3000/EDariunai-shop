import FormSection from "@/components/FormSection"
import SellerForm from '@components/SellerForm';

const SellerFormPage = () => {
  return (
    <section className="w-[100%] flex justify-center items-center flex-col">

      <h2 className="lg:text-3xl sm:text-2xl text-center pb-8">
        Become a seller and start selling your products on the marketplace!
      </h2>

      <FormSection>
        <SellerForm />
      </FormSection>
      

    </section>
  )
}

export default SellerFormPage