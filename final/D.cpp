// #include <bits/stdc++.h>
#include <iostream>
#include <fstream>
#include <queue>
#include <vector>
#include <map>

#define ll = long long;

using namespace std;

//print the answer to a file
void printAnswer(vector<int> &result, int sum, const char *namefile) {
    freopen(namefile, "w",stdout);
    if ( result.size() ) {
        cout << result.size() << endl;

        for ( int &a : result ) {
            cout << a << " ";
        }
    } else {
        cout << sum;
    }
}

// print the vector for debug
void printVector(vector<int> &vec) {
    cout << "Vec: ";
    for (int &v : vec) {
        cout << v << " ";
    }
    cout << endl;
}

int main(){
    freopen("input.txt","r",stdin);

    int n, M;
    int a;
    int sum = -1;

    cin >> n >> M;

    vector<int>nums;
    vector<int>result;
    vector<int>temp;

    //read data
    while ( cin >> a ) {
        nums.push_back(a);
    }

    // count the sums of all combinations number
    unordered_map<int,vector<int> >map;
	for (int mask = 0; mask < 1 << M; mask++) {
		int s = 0;
		temp.clear();

		for (int i = 0; i < M; i++) {
			if ((mask >> i) & 1) {
				s += nums[i];
				temp.push_back(nums[i]);
			}
		}
        
        if ( !map.count(s) ) {
            map.insert({s, temp});
        }

        if (  map.at(s).size() > temp.size() ) {
            map.at(s) = temp;
        }
	}

    //find minimal pair with k -sum and n-k sum in hashmap
	for ( auto &[key,val] : map) {
		if ((n >> 1) - key < 0) {
			sum = 0;
		}

        if (map.count(n-key)) {
            vector<int>mlist = map.at(n-key);
            if (!result.size() || (result.size() > mlist.size() + val.size())) {
                sum = -1;
                result.clear();
                for ( int &a: mlist ) {
                    result.push_back(a);
                }

                for ( int &a: val ) {
                    result.push_back(a);
                }
            }
        }
	}

    printAnswer(result, sum, "output.txt");

    return 0;
}