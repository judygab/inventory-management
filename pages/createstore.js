import CreateStore from '../components/Forms/CreateStore';
import {withApollo} from '../graphql/apollo';

const CreateStorePage = () => {
  return (
      <CreateStore />
  )
}

export default withApollo(CreateStorePage, {
    ssr: false
});
