import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { supabase } from '@/utils/supabase';
import VideoComponent from '@/components/VideoComponent';

export default function HomeScreen() {
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [viewableItemIndex, setViewableItemIndex] = React.useState(0);

  React.useEffect(() => {
    const fetchVideos = async () => {
      const { data: videoData, error: videoError } = await supabase
        .from('Video')
        .select('*, User(username)')
        .order('created_at', { ascending: false });

      if (videoError) {
        console.error('Error fetching videos:', videoError);
        return;
      }

      const { data: signedUrls, error: signedUrlError } = await supabase.storage
        .from('videos')
        .createSignedUrls(
          videoData.map((video) => video.uri),
          60 * 60 * 24 * 7
        );

      if (signedUrlError) {
        console.error('Error fetching signed URLs:', signedUrlError);
        return;
      }

      // Map the resulting signed URLs back to the videos
      const videosWithUrls = videoData.map((video) => ({
        ...video,
        signedUrl: signedUrls.find((url) => url.path === video.uri)?.signedUrl,
      }));

      setVideos(videosWithUrls);
      setLoading(false);
    };

    fetchVideos();
  }, []);

  // This callback fires when viewable items change
  // We update the active index based on the first viewable item
  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setViewableItemIndex(viewableItems[0].index);
    }
  }).current;

  // Configure how much of the item must be visible before it is considered 'viewable'
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {loading ? (
        <Text style={{ textAlign: 'center', color: 'white' }}>Loading videos...</Text>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(_, index) => index.toString()} // Use index as the key
          renderItem={({ item, index }) => (
            <View
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 20,
              }}
            >
              {/* Compare the current index with viewableItemIndex */}
              <VideoComponent video={item} isViewable={index === viewableItemIndex} />
            </View>
          )}
          pagingEnabled
          snapToAlignment="start"
          snapToInterval={Dimensions.get('window').height}
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      )}
    </View>
  );
}
