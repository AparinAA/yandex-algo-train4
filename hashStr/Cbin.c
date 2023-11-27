// Z-фнукция с помощью бинпоиска
#include <stdio.h>
#include <stdlib.h>

#define MOD 1000000007
#define _x 257

int isEqual(long int *hash, long int *x, int a, int b, int l);
int binSearch(long int *hash, long int *x, int left, int right);

int isEqual(long int *hash, long int *x, int a, int b, int l)
{
    if ((hash[a] * x[l] + hash[b + l]) % MOD == (hash[b] * x[l] + hash[a + l]) % MOD)
    {
        return 1;
    }

    return 0;
}

int binSearch(long int *hash, long int *x, int left, int right)
{
    int l = left;
    int r = right + 1;
    int c;

    while (l < r)
    {
        c = (l + r + 1) / 2;
        if (isEqual(hash, x, 0, left, c - left))
        {
            l = c;
        }
        else
        {
            r = c - 1;
        }
    }

    return l - left;
}

int main(void)
{
    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("output.txt", "w");

    int n = 0, i = 0;
    char c;
    char str[1000002];

    fscanf(in, "%s", str);

    while ((int)str[n] <= (int)'z' && (int)str[n] >= (int)'a')
    {
        n++;
    }

    // char *str = (char *)malloc(sizeof(char) * n);
    long int *hash = (long int *)malloc(sizeof(long int) * (n + 1));
    long int *x = (long int *)malloc(sizeof(long int) * (n + 1));
    long code = 0;

    hash[0] = 0;
    x[0] = 1;

    for (i = 1; i < n + 1; i++)
    {
        code = (long int)str[i - 1] - 96;
        hash[i] = (hash[i - 1] * _x + code) % MOD;
        x[i] = (x[i - 1] * _x) % MOD;
    }

    fprintf(out, "%d ", 0);
    for (i = 1; i < n; i++)
    {
        if (str[i] != str[0])
        {
            fprintf(out, "%d ", 0);
        }
        else
        {
            fprintf(out, "%d ", binSearch(hash, x, i, n - 1));
        }
    }

    free(hash);
    free(x);
    fclose(in);
    fclose(out);

    return 0;
}