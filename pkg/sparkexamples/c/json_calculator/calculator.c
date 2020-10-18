#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "_deps/base64/base64.h"
// #include "build/jansson-prefix/include/jansson.h"
#include "jansson.h"

static unsigned char *decode(char *decode, unsigned int decodelen) {
  unsigned char *decode_out;
  unsigned int encodelen;

  decode_out = malloc(BASE64_DECODE_OUT_SIZE(decodelen));

  encodelen = base64_decode(decode, decodelen, decode_out);

  return decode_out;
}

static char *encode(unsigned char *encode, unsigned int encodelen) {
  char *encode_out;
  unsigned char *decode_out;

  encode_out = malloc(BASE64_ENCODE_OUT_SIZE(encodelen));

  base64_encode(encode, encodelen, encode_out);

  return encode_out;
}

typedef struct {
  int first_addend;
  int second_addend;
} spark_input_t;

static int spark_input_umarshal(spark_input_t *spark_input, char *data) {
  json_t *root;
  json_error_t json_error;

  root = json_loads(data, 0, &json_error);

  int first_addend;
  int second_addend;

  json_unpack(root, "{s:i, s:i}", "firstAddend", &first_addend, "secondAddend",
              &second_addend);
  if (!root) {
    return 1;
  }

  spark_input->first_addend = first_addend;
  spark_input->second_addend = second_addend;

  return 0;
}

typedef struct {
  int sum;
} spark_output_t;

static int spark_output_marshal(spark_output_t spark_output, char **data) {
  json_t *root = json_pack("{s:i}", "sum", spark_output.sum);

  *data = json_dumps(root, 0);
  if (!data) {
    return 1;
  }

  return 0;
}

char *spark_input_encoded;
char *spark_output_encoded;

static void spark_input_init(int length) {
  spark_input_encoded = malloc(length * sizeof(char));
}

static void spark_input_encoded_append(int index, char input) {
  spark_input_encoded[index] = input;
}

static unsigned long spark_output_encoded_get_length() {
  return strlen(spark_output_encoded);
}

static char spark_output_encoded_get(int index) {
  return spark_output_encoded[index];
}

static int spark_ignite() {
  // Decode spark input
  char *spark_input_decoded =
      (char *)decode(spark_input_encoded, strlen(spark_input_encoded));

  printf("decoded spark input: %s\n", spark_input_decoded);

  // Unmarshal spark input
  spark_input_t spark_input = {1, 1};

  int err = spark_input_umarshal(&spark_input, spark_input_decoded);
  if (err != 0) {
    printf("could not unmarshal spark input\n");

    return 1;
  }

  // Process spark input
  int sum = spark_input.first_addend + spark_input.second_addend;

  printf("sum: %d\n", sum);

  // Marshal spark output
  spark_output_t spark_output = {sum};

  char *spark_output_decoded = "";
  err = spark_output_marshal(spark_output, &spark_output_decoded);
  if (err != 0) {
    printf("could not marshal spark output\n");

    return 1;
  }

  printf("decoded spark output: %s\n", spark_output_decoded);

  // Encode spark output
  spark_output_encoded =
      encode((void *)spark_output_decoded, strlen(spark_output_decoded));

  printf("encoded spark output in memory: %s\n", spark_output_encoded);

  return 0;
}

int main(void) {
  // Raw spark input
  char *raw_spark_input = "{\"firstAddend\": 5, \"secondAddend\": 2}";

  printf("raw spark input: %s\n", raw_spark_input);

  // Encode spark input
  char *spark_input_encoded_internal =
      encode((void *)raw_spark_input, strlen(raw_spark_input));

  printf("encoded spark input: %s\n", spark_input_encoded_internal);

  // Write encoded spark input into memory
  spark_input_init(strlen(spark_input_encoded_internal));
  for (int i = 0; i < strlen(spark_input_encoded_internal); i++) {
    spark_input_encoded_append(i, spark_input_encoded_internal[i]);
  }

  // Ignite
  int err = spark_ignite();
  if (err != 0) {
    printf("spark ignition returned error code: %d\n", err);
  }

  // Read encoded spark input from memory
  int spark_output_length = spark_output_encoded_get_length();
  char *name = NULL;
  char *spark_output_encoded_internal =
      calloc(spark_output_length, sizeof(name));
  for (int i = 0; i < spark_output_length; i++) {
    spark_output_encoded_internal[i] = spark_output_encoded_get(i);
  }

  printf("encoded spark output: %s\n", spark_output_encoded_internal);

  return 0;
}
