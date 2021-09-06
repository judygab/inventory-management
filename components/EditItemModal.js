import React, {useState, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Button,
    RadioGroup,
    Radio,
    Flex
} from '@chakra-ui/core';

import {GET_DEALS_QUERY, GET_LOCATIONS_QUERY} from '../graphql/queries';
import {CREATE_DEAL_MUTATION} from '../graphql/mutations';
import {useSearch} from '../utils/search';
import {withAuthModal} from './Auth';
import {useAuth} from '../utils/auth';
import WeekdayButtonGroup from './WeekdayButtonGroup';

function EditItemModal({openAuthModal, item}) {
    const {userId} = useAuth();
    const initialRef = useRef();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {handleSubmit, register, errors} = useForm();
    const [createPost, {loading}] = useMutation(CREATE_DEAL_MUTATION);
    const {data} = useQuery(GET_LOCATIONS_QUERY);
    const [itemData, setItemData] = useState({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      markup: item.markup,
      margin: item.margin,
      supplier: item.supplier,
      department: item.department,
    })

    const onCreateDeal = (
        {alcoholType, description, locationId, startTime, endTime, dayOfWeek, daysActive},
        onClose
    ) => {
        const daysActiveMap = daysActive.map((day) => ({
            dayOfWeek: day,
            startTime,
            endTime
        }));

        createPost({
            variables: {
                alcoholType,
                description,
                locationId,
                daysActive: daysActiveMap
            },
            update: (cache, {data}) => {
                const cachedData = cache.readQuery({
                    query: GET_DEALS_QUERY,
                    variables: {dayOfWeek}
                });

                const newDeal = data['insert_deals'].returning[0];

                cache.writeQuery({
                    query: GET_DEALS_QUERY,
                    variables: {dayOfWeek},
                    data: {
                        ...cachedData,
                        deals: [newDeal, ...cachedData.deals]
                    }
                });
            }
        });

        onClose();
    };

    const onOpenDealModal = () => {
        if (!userId) {
            return openAuthModal();
        }

        onOpen();
    };

    const updateFormData = event =>
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });

    const { name, price, quantity, markup, margin, supplier, department } = itemData;

    return (
        <>
            <Button onClick={onOpenDealModal} className="text-indigo-600 hover:text-indigo-900" minH="40px" w="100%">
                Edit
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="25rem">
                <ModalOverlay />
                <ModalContent borderRadius={4}>
                    <form
                        onSubmit={handleSubmit((data) =>
                            onCreateDeal(
                                {
                                    alcoholType,
                                    dayOfWeek,
                                    daysActive,
                                    description: data.description,
                                    endTime: data.endTime,
                                    locationId: data.locationId,
                                    startTime: data.startTime
                                },
                                onClose
                            )
                        )}
                    >
                        <ModalHeader>Update Item</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl mt={4} isInvalid={errors.name && errors.name.message}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name="name"
                                    ref={register({
                                        required: 'Please enter a name.'
                                    })}
                                    value={name}
                                    onChange={e => updateFormData(e)}
                                />
                                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                            </FormControl>
                            <Flex>
                              <FormControl mt={4} mr={4} isInvalid={errors.price && errors.price.message}>
                                  <FormLabel>Price</FormLabel>
                                  <Input
                                      name="price"
                                      ref={register({
                                          required: 'Please enter a price.'
                                      })}
                                      value={price}
                                      onChange={e => updateFormData(e)}
                                  />
                                  <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
                              </FormControl>
                              <FormControl mt={4} isInvalid={errors.quantity && errors.quantity.message}>
                                  <FormLabel>Quantity</FormLabel>
                                  <Input
                                      name="quantity"
                                      ref={register({
                                          required: 'Please enter a quantity.'
                                      })}
                                      value={quantity}
                                      onChange={e => updateFormData(e)}
                                  />
                                  <FormErrorMessage>{errors.quantity && errors.quantity.message}</FormErrorMessage>
                              </FormControl>
                            </Flex>
                            <Flex>
                              <FormControl mt={4} mr={4} isInvalid={errors.price && errors.price.message}>
                                  <FormLabel>Markup</FormLabel>
                                  <Input
                                      name="markup"
                                      ref={register({
                                          required: 'Please enter a markup.'
                                      })}
                                      value={markup}
                                      onChange={e => updateFormData(e)}
                                  />
                                  <FormErrorMessage>{errors.markup && errors.markup.message}</FormErrorMessage>
                              </FormControl>
                              <FormControl mt={4} isInvalid={errors.margin && errors.margin.message}>
                                  <FormLabel>Margin</FormLabel>
                                  <Input
                                      name="margin"
                                      ref={register({
                                          required: 'Please enter a margin.'
                                      })}
                                      value={margin}
                                      onChange={e => updateFormData(e)}
                                  />
                                  <FormErrorMessage>{errors.margin && errors.margin.message}</FormErrorMessage>
                              </FormControl>
                            </Flex>
                            <FormControl mt={4} isInvalid={errors.supplier && errors.supplier.message}>
                                <FormLabel>Supplier</FormLabel>
                                <Input
                                    name="supplier"
                                    ref={register({
                                        required: 'Please enter a Supplier.'
                                    })}
                                    value={supplier}
                                    onChange={e => updateFormData(e)}
                                />
                                <FormErrorMessage>{errors.supplier && errors.supplier.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl mt={4} isInvalid={errors.department && errors.department.message}>
                                <FormLabel>Department</FormLabel>
                                <Input
                                    name="department"
                                    ref={register({
                                        required: 'Please enter a Department.'
                                    })}
                                    value={department}
                                    onChange={e => updateFormData(e)}
                                />
                                <FormErrorMessage>{errors.department && errors.department.message}</FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button isLoading={loading} type="submit" leftIcon="check" variantColor="teal" ml={3}>
                                Update
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default withAuthModal(EditItemModal);
