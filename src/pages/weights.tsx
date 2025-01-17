import * as React from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import useWeight from "../hooks/use-weight";
import useExercises, { Exercise } from "../hooks/use-exercises";
import { motion, useSpring } from "framer-motion";

export default function Weights(props: RouteComponentProps) {
  const [form, setForm] = React.useState({
    exercise: "1",
    reps: "1",
  });

  const { weight, error, isLoading } = useWeight(form.exercise, form.reps);
  const { data: exercises } = useExercises();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Box>
      <Heading textAlign="center" size="lg">
        Ver Peso
      </Heading>
      <SimpleGrid gridTemplateColumns="1fr min-content" columnGap={4} mt={4}>
        <FormControl id="exercise" isRequired>
          <FormLabel>Ejercicio</FormLabel>
          <Select name="exercise" onChange={handleChange} value={form.exercise}>
            {exercises?.map((exercise: Exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="reps" isRequired>
          <FormLabel>Repeticiones</FormLabel>
          <NumberInput
            onChange={(valueAsString) =>
              setForm({ ...form, reps: valueAsString })
            }
            value={form.reps}
            min={1}
            max={20}
            step={1}
          >
            <NumberInputField name="reps" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Button
          fontSize={!weight ? "xl" : "8xl"}
          boxSize="max"
          p={5}
          w="100%"
          gridColumn="-1/1"
          textAlign="center"
          whiteSpace="break-spaces"
          my={20}
          isLoading={isLoading}
        >
          {!weight ? (
            "No hay un peso para este ejercicio todavía"
          ) : (
            <Weight to={weight} />
          )}
        </Button>
      </SimpleGrid>
    </Box>
  );
}

interface WeightCounterProps {
  to: number;
}

function Weight({ to }: WeightCounterProps) {
  const x = useSpring(0, { duration: 100 });
  const [value, setValue] = React.useState(0);

  x.set(to);
  x.onChange((n) => setValue(n));

  return <motion.span>{value.toFixed(0)}kg</motion.span>;
}
