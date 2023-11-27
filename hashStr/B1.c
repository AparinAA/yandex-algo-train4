#include <stdio.h>
#include <stdlib.h>

#define MOD 1000000007
#define _x 257
#define max(x, y) x > y ? x : y

int isEqual(long int *hash, long int *x, int a, int b, int l);

int isEqual(long int *hash, long int *x, int a, int b, int l)
{
    if ((hash[a + l] + hash[b] * x[l]) % MOD == (hash[b + l] + hash[a] * x[l]) % MOD)
    {
        return 1;
    }

    return 0;
}

int main(void)
{

    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("output.txt", "w");

    int n = 0;
    char c;
    char str[50002];

    // while (fscanf(in, "%c", &c) == 1 && c != '\n')
    // {
    //     n++;
    // }

    fscanf(in, "%s", str);

    while ((int)str[n] <= (int)'z' && (int)str[n] >= (int)'a' || (int)str[n] <= (int)'Z' && (int)str[n] >= (int)'A')
    {
        n++;
    }

    // fseek(in, 0, SEEK_SET);

    long int *hash = (long int *)malloc(sizeof(long int) * (n + 1));
    long int *x = (long int *)malloc(sizeof(long int) * (n + 1));

    long int code = 0;
    int i = 1, maxLen = 0;

    hash[0] = 0;
    x[0] = 1;

    // while (fscanf(in, "%c", &c) == 1 && c != '\n')
    for (i = 1; i < n + 1; i++)
    {
        // code = (long int)c;
        code = (long int)str[i - 1];
        hash[i] = (hash[i - 1] * _x + code) % MOD;
        x[i] = (x[i - 1] * _x) % MOD;
    }

    for (i = 0; i < n; i++)
    {
        if (isEqual(hash, x, 0, n - i, i) == 1)
        {
            maxLen = max(maxLen, i);
        }
    }

    fprintf(out, "%d", n - maxLen);

    free(hash);
    free(x);
    fclose(in);
    fclose(out);

    return 0;
}