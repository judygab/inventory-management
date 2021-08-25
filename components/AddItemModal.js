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

function AddItemModal({openAuthModal}) {
    const {userId} = useAuth();
    const initialRef = useRef();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {handleSubmit, register, errors} = useForm();
    const {dayOfWeek} = useSearch();
    const [alcoholType, setAlcoholType] = useState('BEER');
    const [daysActive, setDaysActive] = useState(['Monday']);
    const [createPost, {loading}] = useMutation(CREATE_DEAL_MUTATION);
    const {data} = useQuery(GET_LOCATIONS_QUERY);

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

    return (
        <>
            <Button onClick={onOpenDealModal} leftIcon="add" variantColor="teal" variant="solid" minH="40px" w="100%">
                Add New Item
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
                        <ModalHeader>Add Item</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl as="fieldset">
                                <FormLabel as="legend">Alcohol Type</FormLabel>
                                <RadioGroup
                                    isInline
                                    spacing={4}
                                    ref={initialRef}
                                    defaultValue="BEER"
                                    onChange={(e) => setAlcoholType(e.target.value)}
                                >
                                    <Radio value="BEER">Beer</Radio>
                                    <Radio value="WINE">Wine</Radio>
                                    <Radio value="LIQUOR">Liquor</Radio>
                                    <Radio value="FOOD">Food</Radio>
                                </RadioGroup>
                            </FormControl>
                            <FormControl mt={4} isInvalid={errors.name && errors.name.message}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name="name"
                                    ref={register({
                                        required: 'Please enter a name.'
                                    })}
                                    placeholder="White Claws"
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
                                      placeholder="$$"
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
                                      placeholder="3"
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
                                      placeholder="%"
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
                                      placeholder="%"
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
                                    placeholder=""
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
                                    placeholder=""
                                />
                                <FormErrorMessage>{errors.department && errors.department.message}</FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button isLoading={loading} type="submit" leftIcon="check" variantColor="teal" ml={3}>
                                Create
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default withAuthModal(AddItemModal);
