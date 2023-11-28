#include <stdio.h>
#include <stdlib.h>
#define MOD 1000000007
#define _x 257

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

    char c;
    int n = 0, i = 0, N = 0;
    int l = 0, a = 0, b = 0;
    char str[200002];

    fscanf(in, "%s", str);

    while ((int)str[n] <= (int)'z' && (int)str[n] >= (int)'a' || (int)str[n] <= (int)'Z' && (int)str[n] >= (int)'A')
    {
        n++;
    }

    // !! Если использовать динамическую память , а не статичкую для str
    // while (fscanf(in, "%c", &c) == 1)
    // {
    //     if (c == '\n')
    //     {
    //         break;
    //     }
    //     n++;
    // }

    // fseek(in, 0, SEEK_SET);

    // char *str = (char *)malloc(sizeof(char) * n);

    // for (i = 0; i < n; i++)
    // {
    //     fscanf(in, "%c", &c);
    //     str[i] = c;
    // }

    long int code = 0;

    long int *hash = (long int *)malloc(sizeof(long int) * (n + 1));
    long int *x = (long int *)malloc(sizeof(long int) * (n + 1));

    hash[0] = 0;
    x[0] = 1;

    for (i = 1; i < n + 1; i++)
    {
        code = (long int)str[i - 1];
        hash[i] = (hash[i - 1] * _x + (code - 96)) % MOD;
        x[i] = (x[i - 1] * _x) % MOD;
    }

    fscanf(in, "%d", &N);
    for (i = 0; i < N; i++)
    {
        fscanf(in, "%d %d %d", &l, &a, &b);
        fprintf(out, "%s\n", isEqual(hash, x, a, b, l) == 1 ? "yes" : "no");
    }

    fclose(in);
    fclose(out);
    free(x);
    free(hash);
    // free(str);

    return 0;
}